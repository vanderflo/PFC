/* 

	projectTree Styler v0.1
	written by Alen Grakalic, provided by Css Globe (cssglobe.com)
	visit http://cssglobe.com/lab/projectTree_styler/
	
*/

 function initTree(){
	var projectTree = document.getElementById("projectTree");
	if(projectTree){
		
		this.listItem = function(li){
			if(li.getElementsByTagName("ul").length > 0){
				var ul = li.getElementsByTagName("ul")[0];
				ul.style.display = "none";
				var span = document.createElement("span");
				span.className = "collapsed";
				span.onclick = function(){
					ul.style.display = (ul.style.display == "none") ? "block" : "none";
					this.className = (ul.style.display == "none") ? "collapsed" : "expanded";
				};
				li.appendChild(span);
			};
		};
		
		var items = projectTree.getElementsByTagName("li");
		for(var i=0;i<items.length;i++){
			listItem(items[i]);
		};
		
	};	
};

