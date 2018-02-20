export class Document {


    constructor( public db, public request ) {

    }

    async create( obj ) {

        obj['created'] = new Date();
        obj['updated'] = null;

        await this.db.collect('x-users').doc().set( obj );

        return true;
    }
    read() {
        return;
    }
    update() {
        return;
    }
    delete() {
        return;
    }

    
}
