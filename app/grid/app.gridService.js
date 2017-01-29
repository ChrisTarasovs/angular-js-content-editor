awp.service('editor', function(){
    return {
            actualRange: '',  // I am getting the start and end of parent node
            selectedContent: '', // Getting selected content
            selectedParentNodes: '', // Getting selected Parent Nodes
            selectionAncestor: '' // Getting common parents.
    }

});