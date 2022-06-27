const API = 'https://graph.facebook.com/v14.0/';
const TOKEN = '?files=name&access_token=EAAKJUyWcaF8BAM5vrhVv3ZBbVaMJFVS0ZCdfRSHlcL2wgCZCzwWZACk1qaSt304KE261p9RHKCTNHCsoQZBdldr01I8izwbESZCfk0c7jqbbuzDHLNwRPxZC5xPpAVbnloFJFjxpb7S457kGgYZBhvYieqSk9tPb0MUqRIU7cqZCttGgIPqQwxB3B'

const application = Vue.createApp({ //instancia de vue
    data() {
        return {
            search: null,
            result: null,
            failure: null,
            saved: new Map(),
        }
    },
    methods:{
        async SearchUser(){
            try{
                console.log(this.search)
                const response = await fetch(API + this.search + TOKEN);
                if(!response.ok) throw new Error('No se ha podido encontrar el usuario especificado');
                const data = await response.json();
                this.resultado = data;
                this.fail = false;
                console.log(data)
            }catch(error){
                this.fail = error;
                this.search = false;
                console.log(this.fail)
            }finally{
                this.search = null;
            }
        },
        // save(){ //añadir a la lista favoritos
        //     this.saved.set(this.result.id, this.result);
        //     this.UpdateStorage()
        // },
        // removeSaved(id){ //eliminar de la lista favoritos
        //     this.saved.delete(id);
        //     this.UpdateStorage()
        // },
        // seeResult(data){ //
        //     this.result = data;
        //     this.fail = null;
        // },
        // UpdateStorage(){ //
        //     window.localStorage.setItem('Guardados', JSON.stringify(this.allsaved));
        // },
    },
    // computed:{
    //     itsSaved(){ //comprobar si el resultado esta en Favoritos
    //         return this.favoritos.has(this.resultado.id);
    //     },
    //     allsaved(){ //extraer toda la lista de favoritos
    //         return Array.from(this.favoritos.values());
    //     }
    // },
}).mount('#content')