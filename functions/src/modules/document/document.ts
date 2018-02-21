export class Document {


    constructor( public db, public request ) {

    }

    async create( obj ) {

        obj['created'] = new Date();
        obj['updated'] = null;

        await this.db.collect('x-users').doc().set( obj );

        return { status : 'ok' };
    }
    async read( collection ) {
        let data = [];
        let obj = {};
        await this.db.collection(collection).get()
        
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {                
                data.push(  obj[doc.id] = doc.data()  );
            });
        
        });
        // return data;
        return JSON.stringify(data);
    }
    update() {
        return;
    }
    delete() {
        return;
    }

}
