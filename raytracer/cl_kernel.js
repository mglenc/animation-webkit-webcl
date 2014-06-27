/* OpenCL Raytracing Kernel
 * For SE195B Project by:
 *	Cameron Brown
 *  Mark Becker
 *
 *	Extended with triangle intersection by Michal Glenc.
 */

#ifdef DEBUGGING
#pragma OPENCL EXTENSION cl_amd_printf : enable
#define DEBUG(st, i) \
			if (get_global_id(0) == 160500) \
				printf("%s : f - %f ~ d - %d\r\n", st, i, i);
#endif

#ifdef D_FAST_NORMALIZE
#define NORMALIZE(A) fast_normalize(A)
#elif defined D_BUILTIN_NORMALIZE
#define NORMALIZE(A) normalize(A)
#else
#define NORMALIZE(A) soft_normalize(A)
#endif

#ifdef D_NATIVE_SQRT
#define SQRT(A) native_sqrt(A)
#else
#define SQRT(A) sqrt(A)
#endif

#ifdef D_BUILTIN_DOT
#define DOT(A, B) dot(A, B)
#else
#define DOT(A, B) soft_dot(A, B)
#endif

#ifdef D_BUILTIN_CROSS
#define CROSS(A, B) cross(A, B)
#else
#define CROSS(A, B) soft_cross(A, B)
#endif

#ifdef D_BUILTIN_LEN
#define LENGTH(A) length(A)
#else
#define LENGTH(A) soft_length(A)
#endif

float4 soft_normalize(float4 vec){
	float l = 1/SQRT(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
	return (float4)(vec.x *= l, vec.y *= l, vec.z *= l, 0);
}

float soft_dot(float4 vec_a, float4 vec_b){
	return vec_a.x * vec_b.x + vec_a.y * vec_b.y + vec_a.z * vec_b.z;
}

float4 soft_cross(float4 vec_a, float4 vec_b){
	return (float4) (vec_a.y*vec_b.z - vec_a.z*vec_b.y,vec_a.z*vec_b.x - vec_a.x*vec_b.z,vec_a.x*vec_b.y - vec_a.y*vec_b.x,0);
}

float soft_length(float4 vec){
	return SQRT(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
}

// cant have dynamic allocation in the kernel
#ifdef D_TRACEDEPTH_0
#define TRACEDEPTH 0
#define MAX_RAY_COUNT 1
#elif defined D_TRACEDEPTH_1
#define TRACEDEPTH 1
#define MAX_RAY_COUNT 2
#elif defined D_TRACEDEPTH_2
#define TRACEDEPTH 2
#define MAX_RAY_COUNT 4
#elif defined D_TRACEDEPTH_3
#define TRACEDEPTH 3
#define MAX_RAY_COUNT 8
#elif defined D_TRACEDEPTH_4
#define TRACEDEPTH 4
#define MAX_RAY_COUNT 32
#elif defined D_TRACEDEPTH_5
#define TRACEDEPTH 5
#define MAX_RAY_COUNT 64
#else
#define TRACEDEPTH 5
#define MAX_RAY_COUNT 64
#endif

// Intersection method return values
#define HIT		 1		// Ray hit primitive
#define MISS	 0		// Ray missed primitive
#define INPRIM	-1		// Ray started inside primitive

#define EPSILON 0.001f

// ray queue to simulate recursion

#define PUSH_RAY(q, r, c, n) \
	if (c >= MAX_RAY_COUNT) \
		c = 0; \
	q[c++] = r; \
	n++; 

#define POP_RAY(q, r, c, n) \
	if (c >= MAX_RAY_COUNT) \
		c = 0; \
	r = q[c++]; \
	n--;
	
// typedefs - repeated from common.h, but for the kernel
typedef uchar4 Pixel;
typedef float4 Color;

// Note - these enums were anonymous previously, and compiled fine under AMD's OpenCL drivers.
// Using Intels, the compiler throws an error with anonymous enums.
typedef enum raytype {
	ORIGIN = 0,
	REFLECTED = 1,
	REFRACTED = 2
} ray_type;

// Not used in this application
typedef enum primtype {
	PLANE = 0,
	SPHERE = 1
} prim_type;

// The dummy_3 value is used to align the struct properly.
// OpenCL requires 16-byte alignment (ie 4 floats) for its vector data types. Without
// the dummy_3 value, the Primitive struct will not copy from the host correctly.
// See common.h for structure value information
// IMPORTANT
typedef struct {
	Color m_color;
	float m_refl;
	float m_diff;
	float m_refr;
	float m_refr_index;
	float m_spec;
	float dummy_3;
	float type;
	float is_light;
	float4 normal;
	float4 center;
	float depth;
	float radius, sq_radius, r_radius;
} Primitive;

typedef struct {
	float4 origin;
	float4 direction;
	float weight;
	float depth;
	int origin_obj;
	int origin_type;
	ray_type type;
	float r_index;
	Color transparency;
} Ray;

typedef struct {
	Color m_color;
	float m_refl;
	float m_diff;
	float m_refr;
	float m_refr_index;
	float m_spec;
	//16-byte alignment fill
	float dummy_1;
	float dummy_2;
	float dummy_3;
	float4 v;
	float4 u;
	float4 w;
} Triangle;

/*triangle raytracer*/
typedef struct _ray4_t
{
    float4 rox, roy, roz;
    float4 rdx, rdy, rdz;
    float4 t;
} ray4_t;

typedef struct _triangle4_t
{
    float4 v0x, v0y, v0z;
    float4 e1x, e1y, e1z;
    float4 e2x, e2y, e2z;
} triangle4_t;

typedef struct _triangle_t
{
    float v[3][4];  // (x,y,z,w) * 3
} triangle_t;

inline float4 mycross4(float4 a, float4 b, float4 c, float4 d) {
    return ((a * c) - (b * d));
}

inline float4 mydot4(float4 ax, float4 ay, float4 az, float4 bx, float4 by, float4 bz) {
    return (ax * bx + ay * by + az * bz);
}

int triangle_intersect(local Triangle * t, Ray * ray, float * cumu_dist) {	
	//Inside-out method
	//TO DO: counting triangles normals before raytracing
	//TO DO: checking if triangle clockwise before raytrace
	//edges
	/*t->v = (float4) (0.0, 5.0, 10.0, 0.0);
	t->u = (float4) (-5.0, 5.0, 5.0, 0.0);
	t->w = (float4) (5.0, 5.0, 5.0, 0.0 );*/
	
	/*float4 edge0 = t->u - t->v;
	float4 edge1 = t->w - t->u;
	float4 edge2 = t->v - t->w;
    
    float4 normal = CROSS( edge0, edge1 );
    
    //checing if vertices are in clockwise order
    //TO DO: fix clockwise order
    
    float nDotRay = DOT(normal, ray->direction);
    
    //if triangle and ray are not parallel
    if(nDotRay != 0) {
    	float d = DOT(normal, t->v);
    	float dist = - (DOT(normal, ray->origin) + d) / nDotRay;
    	if (dist >= 0 && dist < *cumu_dist){
    		//intersection point
    		float4 p = ray->origin + dist * ray->direction;
    	
			//test if point is in triangle
			float4 vp0 = p - t->v;
			edge0 = t->u - t->v;
			if(DOT(normal, CROSS(edge0, vp0)) < 0) {
				return MISS;
			}
			
			float4 vp1 = p - t->u;
			edge1 = t->w - t->u;
			if(DOT(normal, CROSS(edge1, vp1)) < 0) {
				return MISS;
			}
			
			float4 vp2 = p - t->w;
			edge2 = t->v - t->w;
			if(DOT(normal, CROSS(edge2, vp2)) < 0) {
				return MISS;
			}
			
			*cumu_dist = dist;
			return HIT;
		}
    }*/
    
    //return MISS;
    
    //Moller Trumbore method
    float4 edge1 = t->u - t->v;
    float4 edge2 = t->w - t->v;
    
    float4 pvec = CROSS(ray->direction, edge2);
    float det = DOT(edge1, pvec);
    
    if(det == 0) {
    	return MISS;
    }
    
    float invDet = 1.0 / det;
    
    float4 tvec = ray->origin - t->v;
    float u = DOT(tvec, pvec) * invDet;
    if(u < 0.0 || u > 1.0) {
    	return MISS;
    }
    
    float4 qvec = CROSS(tvec, edge1);
    float v = DOT(ray->direction, qvec) * invDet;
    if(v < 0.0 || u + v > 1.0) {
    	return MISS;
    }
    
    float dist = DOT(edge2, qvec) * invDet;
    if (dist >= 0 && dist < *cumu_dist) {
    	*cumu_dist = dist;
    	return HIT;
    }
    
    return MISS;
}
/*end triangle raytracer*/

// functions
int plane_intersect(local Primitive * p, Ray * ray, float * cumu_dist ){
	float d = DOT( p->normal, ray->direction );
	if ( d != 0 ){
		float dist = - ( DOT( p->normal, ray->origin ) + p->depth ) / d;
		if (dist > 0 && dist < *cumu_dist){
			*cumu_dist = dist;
			return HIT;
		}
	}
	return MISS;
}

int sphere_intersect(local Primitive * p, Ray * ray, float * cumu_dist ){
	float4 v = ray->origin - p->center;
	float b = - DOT( v, ray->direction );
	float det = (b * b) - DOT(v, v) + p->sq_radius;
	int retval = MISS;
	if (det > 0){
		det = SQRT(det);
		float i1 = b - det;
		float i2 = b + det;
		if (i2 > 0){
			if (i1 < 0){
				if (i2 < * cumu_dist){
					*cumu_dist = i2;
					retval = INPRIM;
				}
			}else{
				if (i1 < * cumu_dist){
					*cumu_dist = i1;
					retval = HIT;
				}
			}
		}
	}
	return retval;
}

int intersect(local Primitive * p, Ray * ray, float * cumu_dist ){
	switch ((int)p->type){
		case 0:
			return plane_intersect(p, ray, cumu_dist);
		case 1:
			return sphere_intersect(p, ray, cumu_dist);
	}
	return MISS;
}

float4 get_normal(local Primitive * p, float4 point){
	switch ((int)p->type){
		case 0:
			return (p->normal);
		case 1:
			return (point - p->center) * p->r_radius;
	}
	return (float4) (0, 0, 0, 0);
}

float4 get_triangle_normal(local Triangle * t, float4 point) {	
    float e1x = (float)(t->u[0] - t->v[0]);
    float e1y = (float)(t->u[1] - t->v[1]);
    float e1z = (float)(t->u[2] - t->v[2]);
    float e2x = (float)(t->w[0] - t->v[0]);
    float e2y = (float)(t->w[1] - t->v[1]);
    float e2z = (float)(t->w[2] - t->v[2]);
    
    return (float4) (e1x*e2x, e1y*e2y, e1z*e2z, 0);
}

int raytrace(Ray * a_ray, Color * a_acc, float * a_dist, float4 * point_intersect, int * result, local Primitive * primitives, int n_primitives, local Triangle * triangles, int n_triangles, int * obj_type){
	*a_dist = MAXFLOAT;
	int obj_index = -1;
	
	*obj_type = 1;
	
	// find nearest intersection primitives - primitives behind triangles
	for (int s = 0; s < n_primitives; s++ ){
		int res;
		res = intersect(&primitives[s], a_ray, a_dist);
		if (res){			
			obj_index = s;
			* result = res;
			
			* obj_type = 1;
		}
	}
	
	// find nearest intersection triangles
	for ( int s = 0; s < n_triangles; s++ ){
		int res;
		res = triangle_intersect(&triangles[s], a_ray, a_dist);
		if (res){			
			obj_index = s;
			* result = res;
			
			* obj_type = 2;
		}
	}
	
	// no hit
	if (obj_index == -1) return -1;
	// handle hit
	if (*obj_type == 1 && primitives[obj_index].is_light == 1.0f){
		*a_acc = primitives[obj_index].m_color;
	}else{
		*point_intersect = a_ray->origin + (a_ray->direction * (*a_dist));
		// trace lights
		for (int l = 0; l < n_primitives; l++){
			if (primitives[l].is_light == 1.0f)	{
				// point light source shadows
				float shade = 1.0f;
				float L_LEN = LENGTH(primitives[l].center - *point_intersect);
				float4 L = NORMALIZE(primitives[l].center - *point_intersect);
				if (primitives[l].type == 1.0f){
					Ray r;
					r.origin = *point_intersect + L * EPSILON;
					r.direction = L;
					int s = 0;
					while ( s < n_primitives ){
						if (&primitives[s] != &primitives[l] && !(primitives[s].is_light == 1.0f) && intersect(&primitives[s], &r, &L_LEN)){
							shade = 0;
						}
						s++;
					}
					
					int t = 0;
					while ( t < n_triangles ){
						if (triangle_intersect(&triangles[t], &r, &L_LEN)){
							shade = 0;
						}
						t++;
					}
				}
				
				if(*obj_type == 1) {
					// Calculate diffuse shading
					float4 N = get_normal(&primitives[obj_index], *point_intersect);
					if (primitives[obj_index].m_diff > 0){
						float dot_prod = DOT( N, L );
						if (dot_prod > 0){
							float diff = dot_prod * primitives[obj_index].m_diff * shade;
							* a_acc += diff * primitives[obj_index].m_color * primitives[l].m_color;
						}
					}
					// Calculate specular shading
					if (primitives[obj_index].m_spec > 0){
						float4 V = a_ray->direction;
						float4 R = L - 1.5f * DOT ( L, N ) * N;
						float dot_prod = DOT ( V, R );
						if (dot_prod > 0){
							float spec = native_powr( dot_prod, 20 ) * primitives[obj_index].m_spec * shade;
							* a_acc += spec * primitives[l].m_color;
						}
					}
				} else if(*obj_type == 2) {
					float4 N = get_triangle_normal(&triangles[obj_index], *point_intersect);
					if (triangles[obj_index].m_diff > 0){
						float dot_prod = DOT( N, L );
						if (dot_prod > 0){
							float diff = dot_prod * triangles[obj_index].m_diff * shade;
							* a_acc += diff * triangles[obj_index].m_color * triangles[l].m_color;
						}
					}
					// Calculate specular shading
					if (triangles[obj_index].m_spec > 0){
						float4 V = a_ray->direction;
						float4 R = L - 1.5f * DOT ( L, N ) * N;
						float dot_prod = DOT ( V, R );
						if (dot_prod > 0){
							float spec = native_powr( dot_prod, 20 ) * triangles[obj_index].m_spec * shade;
							* a_acc += spec * triangles[l].m_color;
						}
					}
				}
			}
		}
	}
	return obj_index;
}

// raytracing kernel
__kernel void raytracer_kernel ( __global uchar4 *inBuff,
								__global uchar4 *outBuff, 
								uint image_width, 
								uint image_height,
								float camera_x,
								float camera_y,
								float camera_z,
								float viewport_x,
								float viewport_y,	
								global float4 *global_prims, 		
								int n_primitives,
								local float4 *local_prims,
								
								global float4 *global_tris,
								int n_triangles,
								local float4 *local_tris){
	
	// Copy primitives from global to local memory; GPU speedup was ~30% with n_primitives 64
	event_t events[2];
	events[0] = async_work_group_copy(local_prims, global_prims, (size_t) ((sizeof(Primitive) * n_primitives)/sizeof(float4)), 0);
	wait_group_events(1, events);

	events[1] = async_work_group_copy(local_tris, global_tris, (size_t) ((sizeof(Triangle) * n_triangles)/sizeof(float4)), 0);
	wait_group_events(2, events);

	local Primitive * primitives = (local Primitive *) local_prims;
	
	local Triangle * triangles = (local Triangle *) local_tris;
	
	//TO DO: count normal for every triangle
	//TO DO: complex color data should be passed as one, not for every triangle
	//36bytes saved on each triangle

	// Determine this thread's pixel
	int x = get_global_id(0);
	int y = get_global_id(1);
	int c = y * image_width + x;

	// Out of bounds guard
	if (x >= image_width || y >= image_height)
		return;
			
	// Our viewport size can be different than the image size. This lets us calculate
	// the stepping within the viewport relative to the stepping within the image.
	// IE with a viewport width of 6.0f and an image width of 800, each pixel is 1/800 of 6.0f 
	// or 0.0075f. 
	// x stepping, left -> right
	const float dx = viewport_x / image_width;
	// y stepping, top -> bottom
	const float dy = -viewport_y / image_height; 
	// this pixel's viewport x
	const float sx = -(viewport_x / 2.0f) + x * dx; 
	// this pixel's viewport y
	const float sy = (viewport_y / 2.0f) + y * dy; 

	// Initializes the ray queue. OpenCL has no support for recursion, so recursive ray tracing calls
	// were replaced by a queue of rays that is processed in sequence. Since the recursive calls were
	// additive, this works.
	Ray queue[MAX_RAY_COUNT];
	int rays_in_queue = 0;
	int front_ray_ptr = 0;
	int back_ray_ptr = 0;

	float4 camera = (float4)( camera_x, camera_y, camera_z, 0 );
	Color acc = (Color)( 0, 0, 0, 0 );	
	
	// We use 3x supersampling to smooth out the edges in the image. This means each pixel actually
	// fires 9 initial rays, plus the recursion and refraction.
	for (int tx = -1; tx < 2; tx++ ){
		for (int ty = -1; ty < 2; ty++ ){
			// Create initial ray.
			float4 dir = NORMALIZE( (float4)(sx + dx * (tx / 2.0f), sy + dy * (ty / 2.0f), 0, 0) - camera);
			Ray r;
			r.origin = camera;
			r.direction = dir;
			r.weight = 1.0f;
			r.depth = 0;
			r.origin_obj = -1;
			r.origin_type = -1;
			r.type = ORIGIN;
			r.r_index = 1.0f;
			r.transparency = (Color) (1, 1, 1, 0);

			// Populate queue and start the processing loop.
			PUSH_RAY(queue, r, back_ray_ptr, rays_in_queue)

			while (rays_in_queue > 0){
				float dist;
				Ray cur_ray;
				POP_RAY(queue, cur_ray, front_ray_ptr, rays_in_queue)
				Color ray_col = (Color)( 0, 0, 0, 0 );
				float4 point_intersect;
				int result;
				
				//obj_index is object index in primitives or triangles array
				int obj_index;
				//primitive or triangle?
				int obj_type = -1;
				
				// raytrace performs the actual tracing and returns useful information
				obj_index = raytrace( &cur_ray, &ray_col, &dist, &point_intersect, &result, primitives, n_primitives, triangles, n_triangles, &obj_type);
				// reflected/refracted rays have different modifiers on the color of the object
				switch ( cur_ray.type ){
					case ORIGIN:
						acc += ray_col * cur_ray.weight;
						break;
					case REFLECTED:
						if(cur_ray.origin_type == 1) {
							acc += ray_col * cur_ray.weight * primitives[cur_ray.origin_obj].m_color * cur_ray.transparency;
						} else if(cur_ray.origin_type == 2) {
							acc += ray_col * cur_ray.weight * triangles[cur_ray.origin_obj].m_color * cur_ray.transparency;
						}
						break;
					case REFRACTED:
						acc += ray_col * cur_ray.weight * cur_ray.transparency;
						break;
				}
				// handle reflection & refraction
				if (cur_ray.depth < TRACEDEPTH){
					// reflection
					float refl;
					if(obj_type == 1) {
						refl = primitives[obj_index].m_refl;
					} else if(obj_type == 2) {
						refl = triangles[obj_index].m_refl;
					}
					if (refl > 0.0f){
						
						float4 N;
						if(obj_type == 1) {
							N = get_normal(&primitives[obj_index], point_intersect);
						} else if(obj_type == 2) {
							N = get_triangle_normal(&triangles[obj_index], point_intersect);
						}
						
						float4 R = cur_ray.direction - 2.0f * DOT( cur_ray.direction, N ) * N;
						Ray new_ray;
						new_ray.origin = point_intersect + R * EPSILON;
						new_ray.direction = R;
						new_ray.depth = cur_ray.depth + 1;
						new_ray.weight = refl * cur_ray.weight;
						new_ray.type = REFLECTED;
						new_ray.origin_obj = obj_index;
						new_ray.origin_type = obj_type;
						new_ray.r_index = cur_ray.r_index;
						new_ray.transparency = cur_ray.transparency;
						PUSH_RAY(queue, new_ray, back_ray_ptr, rays_in_queue)
					}
					// refraction
					float refr;
					if(obj_type == 1) {
						refr = primitives[obj_index].m_refr;
					} else if(obj_type == 2) {
						refr = triangles[obj_index].m_refr;
					}
					if (refr > 0.0f){
						float m_rindex;
						float4 N;
						
						if(obj_type == 1) {
							m_rindex = primitives[obj_index].m_refr_index;
							N = get_normal(&primitives[obj_index], point_intersect) * (float) result;
						} else if(obj_type == 2) {
							m_rindex = triangles[obj_index].m_refr_index;
							N = get_triangle_normal(&triangles[obj_index], point_intersect) * (float) result;
						}
						
						float n = cur_ray.r_index / m_rindex;
						float cosI = - DOT ( N, cur_ray.direction );
						float cosT2 = 1.0f - n * n * (1.0f - cosI * cosI);
						if (cosT2 > 0.0f){
							float4 T = (n * cur_ray.direction) + (n * cosI - SQRT( cosT2 )) * N;
							Ray new_ray;
							new_ray.origin = point_intersect + T * EPSILON;
							new_ray.direction = T;
							new_ray.depth = cur_ray.depth + 1;
							new_ray.weight = cur_ray.weight;
							new_ray.type = REFRACTED;
							new_ray.origin_obj = obj_index;
							new_ray.origin_type = obj_type;
							new_ray.r_index = m_rindex;
							
							if(obj_type == 1) {
								new_ray.transparency = cur_ray.transparency * (exp(primitives[obj_index].m_color * 0.15f * (-dist)));
							} else if(obj_type == 2) {
								new_ray.transparency = cur_ray.transparency * (exp(triangles[obj_index].m_color * 0.15f * (-dist)));
							}
							
							PUSH_RAY(queue, new_ray, back_ray_ptr, rays_in_queue)
						}
					}
				}
			}
		}
	}		
	// Since we supersample 3x, we have to divide the total color by 9 to average it.
	uchar red = clamp(acc.x * (256 / 9), 0.0f, 255.0f);
	uchar green = clamp(acc.y * (256 / 9), 0.0f, 255.0f);
	uchar blue = clamp(acc.z * (256 / 9), 0.0f, 255.0f);
	
	outBuff[c] = (uchar4)(red, green, blue, 255);
}