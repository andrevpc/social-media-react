const Article = require('../model/article');
const userController = require('./userController');
const fs = require('fs');
const path = require('path');
const jwtDecode = require('jwt-decode');

class ArticleController {
    static createLog(error) {
        const timestamp = Date.now();
        const archivePath = path.resolve(__dirname, '..', `logs-${timestamp}.txt`);
        const errorString = JSON.stringify(error.message)
        fs.writeFile(archivePath, errorString, function (err, result) {
            if (err) console.log(err)
        })
    }

    static async getAll(req, res) {
        let page = req.params.page;
        let limit = 5;
        let skip = limit * (page - 1);
        try {
            const articles = await Article.find().skip(skip).limit(limit);
            return res.status(200).send(articles);
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ message: "Falha ao carregar os Artigos" })
        }
    };

    static async getPages(req, res) {
        try {
            const articles = await Article.find();
            return res.status(200).send(articles.length);
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ message: "Falha ao carregar os Artigos" })
        }
    }

    static async create(req, res) {
        const { title, text, userId } = req.body;

        if (!title || !text || !userId)
            return res.status(400).send({ message: "os campos não podem estarem vazios " });

        if (title.length < 3)
            return res.status(400).send({ message: "o titulo não pode ser menor que 3 caracteres" });

        if (text.length < 15)
            return res.status(400).send({ message: "o artigo não pode ser menor que 15 caracteres" });

        if (userId.length < 3)
            return res.status(400).send({ message: "O autor não pode ser menor que 3 caracteres" })


        const user = await userController.getUser(userId);
        console.log(user)
        try {
            const article = {
                title,
                text,
                likes: [],
                user,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            }
            await Article.create(article)
            return res.status(201).send({ message: "Artigo criado com sucesso" })
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao salvar o artigo", data: error.message });
        }
    };

    static async likeArticle(req, res) {
        const { articleId } = req.params;
        const { token } = req.body;

        const { id } = jwtDecode(token)

        if (!articleId) return res.status(400).send({ message: "No id provider" })

        try {
            const article = await Article.findById(articleId);
            const { likes } = article;

            likes.push(id);

            await Article.findByIdAndUpdate({ _id: articleId }, { likes })
            return res.status(200).send();
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao curtir", data: error.message })
        }
    };

    static async unlikeArticle(req, res) {
        const { id } = req.params;
        const { userId } = req.body;

        if (!id) return res.status(400).send({ message: "No id provider" });

        try {
            const article = await Article.findById(id);
            var { likes } = article;
            const tempLikes = [];

            likes.map(like => {
                if (like !== userId) tempLikes.push(userId);
            })

            likes = tempLikes;

            await Article.findByIdAndUpdate({ _id: id }, { likes })
            return res.status(200).send();
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao curtir", data: error.message })
        }

    }
}

module.exports = ArticleController;