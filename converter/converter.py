#Format converter for cl3d
from cgkit.objmtl import *

#Override OBJReader class methods
class OBJConverter( OBJReader ):
	def __init__(self):
		#old style super init
		OBJReader.__init__(self)
		
		#vertices list init
		self.vertex = []
		
		#faces list init
		self.faces = []

	def v(self, vert):
		self.vertex.append(vert);
		
	def f(self, *verts):
		self.faces.append(verts);

#Models files paths
lingerie_objpath = './obj/DefenderLingerie00_feet.obj'
lingerie_mtlpath = './obj/DefenderLingerie00_feet.mtl'

#Open files
lingerie_objfile = open(lingerie_objpath, 'r')

#Model readers
obj_converter = OBJConverter()
obj_converter.read(lingerie_objfile)

for i in range(len(obj_converter.faces)):
	v = obj_converter.faces[i][0][0]
	u = obj_converter.faces[i][1][0]
	w = obj_converter.faces[i][2][0]
	
	#subtract one from vertice index, cause they are 1-based
	print "{x:" + str(obj_converter.vertex[v-1][0]) + ", y:" + str(obj_converter.vertex[v-1][1]) + ", z:" + str(obj_converter.vertex[v-1][2]) + "},"
	print "{x:" + str(obj_converter.vertex[u-1][0]) + ", y:" + str(obj_converter.vertex[u-1][1]) + ", z:" + str(obj_converter.vertex[u-1][2]) + "},"
	print "{x:" + str(obj_converter.vertex[w-1][0]) + ", y:" + str(obj_converter.vertex[w-1][1]) + ", z:" + str(obj_converter.vertex[w-1][2]) + "},\n"