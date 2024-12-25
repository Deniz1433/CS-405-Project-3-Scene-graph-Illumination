/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    
	draw(mvp, modelView, normalMatrix, modelMatrix) {
		
    // Create transformed matrices by multiplying with current node's TRS matrix
    var transformedModel = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());
    var transformedMvp = MatrixMult(mvp, this.trs.getTransformationMatrix());
    var transformedModelView = MatrixMult(modelView, this.trs.getTransformationMatrix());
    
    // Calculate new normal matrix
    var transformedNormals = MatrixMult(normalMatrix, this.trs.getRotationMatrix());

    // Draw the current node's mesh if it exists
    if (this.meshDrawer) {
        this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
    }

    // Recursively draw all children with the transformed matrices
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].draw(
            transformedMvp,
            transformedModelView, 
            transformedNormals,
            transformedModel
        );
    }
}
	

    

}