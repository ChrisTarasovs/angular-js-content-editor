
  
// **** Clean func file list **** //
// load bg grid
// func create bg grid - temporal

columnW(1024,36 );
function columnW(
                browserwidth, 
                gridCount
                ){
                    
        console.log('sss');
    var browserW = browserwidth; var gridC = gridCount;
    var columnwidth = browserW / gridC;
    for ( i = 0; i < gridCount; i++) { 
var gridContainer = document.getElementById( '#bgGridTemporal' );
var creatColumn = document.createElement('div');

        creatColumn.style.width= columnwidth;
        creatColumn.style.height= "100%";

        gridContainer.appendChild(creatColumn);   
    }
    return columnwidth;

}



     
})