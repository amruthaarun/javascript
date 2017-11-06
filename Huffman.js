function frequency(str){
	var freqs={};
	for (var i=0; i<str.length;i++){
		c=str[i];
		if(freqs[c]){
		freqs[c]=freqs[c]+1;
		}
		else
		freqs[c]=1;
	}
	return freqs;
}




function sortFreq (freqs){
	arr=new Array();
	codes=new Array();
	var i=0;
	for(var c in freqs){
		arr[i]=new Array(freqs[c],c);
		i=i+1;
	}
	arr=arr.sort(sortAsc);
	return arr;
}

function buildTree(arr){
	var tree = new Array();
 	var tree1 = new Array();
	
	this.next = function() {
 	if (tree.length > 0 && tree1.length > 0 
               && tree[0].freqs < tree1[0].freqs)
	   return tree.shift();
 
	if (tree.length > 0 && tree1.length > 0 
                && tree[0].freqs > tree1[0].freqs)
	   return tree1.shift();
 
	 if (tree.length > 0)
	   return tree.shift();
 
	 return tree1.shift();
 	}
	var i=0;
	for (var c in arr){
	tree[i]= new node();
	tree[i].char=arr[c][1];
	tree[i].freqs=arr[c][0];
	i=i+1;
	}
	//console.log(tree);
	while(tree.length+tree1.length>1){
		var left=next();
		var right=next();
		var tempnode=new node();
		tempnode.left=left;
		tempnode.right=right;
		tempnode.freqs=left.freqs+right.freqs;
		tempnode.left.parent=tempnode;
		tempnode.right.parent=tempnode;
		tree1.push(tempnode);	
	}
	return tree1;	
}
function assignCode(tree){
	var codes = [];
	var currentnode = tree[0];
	var code = "";
	while (currentnode) {
	if (currentnode.char) {
		codes[currentnode.char] = code;
		code = code.substr(0, code.length - 1);
		currentnode.visited = true;
		currentnode = currentnode.parent;
	}
	else if (!currentnode.left.visited) {
		currentnode = currentnode.left;
		code += "0";
	}
	else if (!currentnode.right.visited) {
		currentnode = currentnode.right;
		code += "1";
	}
	else {
		currentnode.visited = true;
		currentnode = currentnode.parent;
		code = code.substr(0, code.length - 1);
	}
	
	}
	return codes;
}

function sortAsc(a, b) {
 return a[1] - b[1];
}

function node() {
  this.left = null;
  this.right = null;
  this.freqs = null;
  this.char = null;
  this.code = "";
  this.parent = null;
  this.visited = false;
}

freqs=frequency("aaabbbccdeefg");

arr=sortFreq(freqs);

tree=buildTree(arr);

codes=assignCode(tree);

function encode(str){
	var output=str.split("");
	for(var ch in output){
	output[ch]=codes[output[ch]];
	}
	return output.join("");

}

encoded=encode("abbcda",);
console.log(encoded);

function decode(str){
	li=str.match(/.{1,3}/g);
	var out=[];
	console.log(li);
	var s=[]
	for(var i=0; i<li.length; i++){
		for(var c in codes){
			if(li[i] == codes[c]){
				out[li[i]]=c;
				s[i]=out[li[i]];
				console.log(s[i]);
				break;
			}
		}
	}
	return s.join("");


}
decoded=decode("11111001000");
console.log(decoded);
