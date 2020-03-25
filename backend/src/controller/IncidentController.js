const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const {page} = request.query;

        const [count] = await connection('incidents').count(); //Contador de incidentes
        // console.log(count); 

        const incidents = await connection('incidents')
            .join('ongs','ongs.id',"=",'incidents.ong_id') //mescla dados de mais de uma tabela
            .limit(10) //quantidade de itens a ser listado por page
            .offset((page-1)*10) //esquema de paginação
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count',count['count(*)']);// envia p/ header do front a quantidade de itens a ser listado
        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;
        
        const [id] = await connection('incidents').insert({
            title,description,value,ong_id,
        })
        
        return response.json({id});
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

            //console.log(id);
            //console.log(ong_id);

        const incidents = await connection('incidents')
            .where('id',id)
            .select('ong_id')
            .first();

            //console.log(incidents.ong_id);

        if(incidents.ong_id != ong_id){
            return response.status(401).json({erro:'Operação não permitida!'});
        }
        await connection('incidents').where('id', id).delete();
        //return response.status(204).send();
        return response.status(200).json('Operação concluida!');
    }
};