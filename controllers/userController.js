const { User } = require('../models');
const generateCRUDControllers = require('./generateCRUDControllers');
const userCRUDControllers = generateCRUDControllers(User);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = {
    ...userCRUDControllers,
    findUsersByUsername: async (req, res) => {
        try {
            const users = await User.findAll({
                where: {
                    username: req.params.username
                }
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    allAccess: (req, res) => {
        res.status(200).send("Public Content.");
    },
    userBoard: (req, res) => {
        res.status(200).send("User Content.");
    },
    updateUser: async (req, res) => {
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
    
            // Проверяем, есть ли userId в токене
            if (!userId) {
                return res.status(400).json({ error: 'Идентификатор пользователя отсутствует в токене' });
            }
            //console.log('user '+userId)
            //console.log('req '+req.params.id)

            // Проверяем, равны ли userId из токена и req.params.id
            if (userId != req.params.id) {
            return res.status(400).json({ error: 'Идентификатор пользователя из токена не соответствует параметру запроса' });
        }
    
            // Проверяем наличие пароля в req.body и хешируем его, если он есть
            if (req.body.passwords) {
                const salt = await bcrypt.genSalt(10);
                req.body.passwords = await bcrypt.hash(req.body.passwords, salt);
            }
    
            // Создаем объект с данными для обновления, включая userId из токена
            const data = { ...req.body, userId };
    
            // Обновляем ресурс в базе данных
            await User.update(data, { where: { id: userId } });
    
            // Получаем обновленный ресурс из базы данных
            const updatedResource = await User.findByPk(userId);
    
            // Возвращаем обновленный ресурс
            res.json(updatedResource);
        } catch (error) {
            // В случае ошибки возвращаем статус 500 и сообщение об ошибке
            res.status(500).json(error);
        }
    },
    deleteUser: async (req, res) => {
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
        if (userId != req.params.id) {
            return res.status(400).json({ error: 'Идентификатор пользователя из токена не соответствует параметру запроса' });
        }

            // Delete the resource
            await model.destroy({ where: { id: userId } });
            res.status(204).json({ message: 'Resource deleted' });
        } catch (error) {
            res.status(500).json(error);
        }
    }

};
    
    


module.exports = userController;
