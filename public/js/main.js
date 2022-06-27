const API = 'https://graph.facebook.com/v14.0/';
const TOKEN = '?fields=id,name,picture,email,link&access_token=EAAKJUyWcaF8BAHUxZBY8ZCyipZBVMbHxI1EnoU16VS54sUNzzxZA9mOM40ZCPSV1TVTjjhsywiy0nBF6gZB0uV7os6uzuyYToEDBuyZB3Lb3FbcwnuRnmhuMk7PsPPpAyDcrFWI9unQzrKgAUHBQtZCYnA3ygxaEIvHJULIEAY1D0AYZAzB1DbNWHNLz2gEvyj35zVqZCxjxSzQC60vcZAJJ1IwPyUkfKtdqrOeSY14fgraRVzs27bfnlZAi'

const application = Vue.createApp({ //instancia de vue
    data() {
        return {
            search: null,
            result: null,
            failure: null,
            saved: new Map(),
        }
    },
    computed:{
      isSaved(){ 
        return this.saved.has(this.result.id);
      },
      allSaved(){
        return Array.from(this.saved.values());
      }
    },
    created(){
      const SavesinSaved = JSON.parse(window.localStorage.getItem('Guardado'))
      if(SavesinSaved && SavesinSaved.length){
        const savedRebuild = new Map(SavesinSaved.map(item => [item.id, item]))
        this.saved = savedRebuild
        console.log(this.saved)
      }
    },
    methods:{
        async SearchUser(){
            try {
                const response = await fetch(API + this.search + TOKEN);
                if(!response.ok) throw new Error("Usuario no encontrado");
                const data = await response.json();
                this.result = data;
                this.failure = false;
            }catch(error){
                this.failure = error;
                this.result = false;
            }finally{
                this.search = null;
            }
        },
        addSaved(){ 
          this.saved.set(this.result.id, this.result);
          this.UpdateStorage()
        },
        deleteSaved(id){ 
          this.saved.delete(id);
          this.UpdateStorage()
        },
        seeResult(datos){ 
          this.result = datos;
          this.failure = null;
        },
        UpdateStorage(){ 
          window.localStorage.setItem('Guardado', JSON.stringify(this.allSaved));
        },
    }
}).mount('#content')