    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    function isAnagram(s, t) {

        if(s.length != t.length)return false

        const letter={a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0,q:0,r:0,s:0,t:0,u:0,v:0,w:0,x:0,y:0,z:0}
        
        for(let i = 0;i<s.length;++i){
            letter[s[i]]+=1
            letter[t[i]]-=1
            
        }

        for(key in letter){

            if (letter[key]!==0){
                return false

            }
        }

        return true
        
    }
    console.log(isAnagram('jar', 'jam'));


// let soso=[4,5,1,5,4]
// let lolo=0
// for(i in soso){
//     console.log(`${lolo}^${soso[i]}=${lolo^soso[i]}`);
// lolo ^=soso[i]
// console.log('after: ',lolo);
// }
//     console.log(lolo);














const fofo=(array)=>{

    // for (let i=0;i<array.length;i++) 
    console.log(array[i]); 

}
















