const jwt = require('jsonwebtoken');

module.exports = {
    refreshToken(req, res) {
        let { token } = req.body;

        if (token == null) {
            token = jwt.sign({ constante: 'CvTeSpAcIaL2018' }, req.app.get('secret'), {
                expiresIn: 86400 // segundos, 24h
            });
        }
        else {
            try {
                const validarToken = jwt.verify(token, req.app.get('secret'));
                
                const expToken = validarToken['exp'] * 1000; //em milissegundos
                const horaAtual = Date.now();  //em milissegundos

                if (horaAtual > expToken) {
                    token = jwt.sign({ constante: 'CvTeSpAcIaL2018' }, req.app.get('secret'), {
                        expiresIn: 86400 // segundos, 24h
                    });
                }
            } catch(e) {
                token = jwt.sign({ constante: 'CvTeSpAcIaL2018' }, req.app.get('secret'), {
                    expiresIn: 86400 // segundos, 24h
                });
            }
        }

        res.set('x-access-token', token);
        return res.json({ mensagem : 'Refresh token realizado com sucesso!'});
        //res.status(401).json({ message: "Falha na autenticação!"}); 
    },
}