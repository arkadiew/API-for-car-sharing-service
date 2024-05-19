const jwt = require('jsonwebtoken');


const generateCRUDControllers = (model) => {
    
    const controllers = {
        create: async (req, res) => {
            try {
                const token = req.headers['x-access-token'];
                const decodeToken = (token) => {
                    try {
                        const decoded = jwt.decode(token);
                        return decoded;
                    } catch (error) {
                        console.error('Ошибка при декодировании токена:', error.message);
                        return null;
                    }
                };
                
                const extractIdFromToken = (token) => {
                    const decoded = decodeToken(token);
                    if (decoded && decoded.id) {
                        return decoded.id;
                    } else {
                        console.error('Невозможно извлечь id из токена.');
                        return null;
                    }
                };
            
                const userId = extractIdFromToken(token);
                
                // console.log(token);
                // console.log(userId);
                
                // Добавляем userId в тело запроса перед созданием ландмарка
                const data = { ...req.body, userId };
        
                // Создаем ландмарк
                const createdItem = await model.create(data);
        
                // Возвращаем созданный ландмарк в ответе
                res.status(201).json(createdItem);
            } catch (error) {
                // В случае ошибки возвращаем статус 400 и сообщение об ошибке
                res.status(400).json(error);
            }
        },
        
        findAll: async (req, res) => {
            try {
                const items = await model.findAll();
                res.status(200).json(items);
            } catch (error) {
                res.status(500).json(error);
            }
        },
        findOne: async (req, res) => {
            try {
                const item = await model.findByPk(req.params.id);
                if (!item) return res.status(404).json({ message: 'Item not found' });
                res.json(item);
            } catch (error) {
                res.status(500).json(error);
            }
        },
        update: async (req, res) => {
            try {
                const token = req.headers['x-access-token'];
            const decodeToken = (token) => {
                try {
                    const decoded = jwt.decode(token);
                    return decoded;
                } catch (error) {
                    console.error('Ошибка при декодировании токена:', error.message);
                    return null;
                }
            };
            
            const extractIdFromToken = (token) => {
                const decoded = decodeToken(token);
                if (decoded && decoded.id) {
                    return decoded.id;
                } else {
                    console.error('Невозможно извлечь id из токена.');
                    return null;
                }
            };
        
            const userId = extractIdFromToken(token);
  
          
            if (req.params.id != (await model.findOne({ where: { userId: userId ,id: req.params.id} })).id) {
                console.error('Идентификатор ресурса не совпадает с идентификатором пользователя.');
                return res.status(400).json({ error: 'Идентификатор ресурса не совпадает с идентификатором пользователя.' });
            }
            const data = { ...req.body, userId };
            console.log('data'+data);
                // Update the resource
                await model.update(data, { where: { userId: userId, id: req.params.id} });
                const updatedResource = await model.findByPk(req.params.id);
                res.json(updatedResource);
            } catch (error) {
                res.status(500).json({ error: 'Внутренняя ошибка сервера' });
            }
        },
        delete: async (req, res) => {
            try {
                const token = req.headers['x-access-token'];
                const decodeToken = (token) => {
                    try {
                        const decoded = jwt.decode(token);
                        return decoded;
                    } catch (error) {
                        console.error('Ошибка при декодировании токена:', error.message);
                        return null;
                    }
                };
        
                const extractIdFromToken = (token) => {
                    const decoded = decodeToken(token);
                    if (decoded && decoded.id) {
                        return decoded.id;
                    } else {
                        console.error('Невозможно извлечь id из токена.');
                        return null;
                    }
                };
        
                const userId = extractIdFromToken(token);
                if (req.params.id != (await model.findOne({ where: { userId: userId,id: req.params.id } })).id) {
                    console.error('Идентификатор ресурса не совпадает с идентификатором пользователя.');
                    return res.status(400).json({ error: 'Идентификатор ресурса не совпадает с идентификатором пользователя.' });
                }
                
           
                await model.destroy({ where: { userId: userId, id: req.params.id } });
                res.status(204).json({ message: 'Resource deleted' });
            } catch (error) {
                console.error('Ошибка при удалении ресурса:', error.message);
                res.status(500).json({ error: 'Внутренняя ошибка сервера' });
            }
        }
    };
        
 return controllers;
}
module.exports = generateCRUDControllers;