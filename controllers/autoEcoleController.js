import AutoEcoleModel from "../models/autoEcole.js"
import bcrypt from "bcrypt";
import { generateToken } from '../middleware/token.js'

class AutoEcoleController {

    
    /**
     * 
     * @param {request} req 
     * @param { response} res 
     * 
     */
    static async create(req , res){
        try {
        const utilisateurExist = await AutoEcoleModel.findOne({email : req.body.email})
        const numExist = await AutoEcoleModel.findOne({phone : req.body.phone})
        if(utilisateurExist) return res.status(400).json({message : 'contact ou email deja utilisé !!'})
        if (numExist) return res.status(400).json({message :"Ce contact est déja utilisé"})
        req.body.password = await bcrypt.hash(req.body.password , 10)
        console.log(req.body.password)
        await AutoEcoleModel.create(req.body)
        .then(user => {
            res.status(200).json({status : true , message : 'auto ecole ajouté !' , user})
        })
        .catch(err => {
            res.status(400).json({message : "impossible d'ajouter cet utilsiateur !!" , error : err.message})
            console.log(err)
        })
        } catch (error) {
            res.status(500).json({message : "une erreur est survenu lors du traitement !!!"})
            console.log(error)
        }
    }

    /**
     * @param {request} req
     * @param {response} res
     */
    static async login(req , res){
        try{
            const { email , password } = req.body
            const utilisateur = await AutoEcoleModel.findOne({email})
            if(!utilisateur) return res.status(400).json({message : "Adresse mail ou mot de passe incorretct !!"})
            const pwtCorrect = bcrypt.compare(password , utilisateur.password)
            if(!pwtCorrect) return res.status(400).json({status : false , message : 'Adresse mail ou mot de passe incorrect'})
            res.cookie('token' , generateToken(utilisateur.toObject()))
            res.status(200).json({status : true ,message : 'connexion éffectuée !!!' , token : generateToken(utilisateur.toObject()) , utilisateur})
        }
        catch(err){
            res.status(500).json({message : "une erreur est survenue !!!" , error : err.message})
        }
    }

    /**
     * @param {request} req
     * @param {response} res
     */
    static async getAll(req , res){
         try {
            const allUtilisateur = await AutoEcoleModel.find()
            if(!allUtilisateur) res.status(200).json({status : false , message : "Aucune liste disponible..."})
            return res.status(200).json({message : "la liste de tout vos utilisateur..." , allUtilisateur})
         } catch (error) {
            res.status(500).json({message : "une erreur est survenue lors du traitement !!!"})
         }
    }

    /**
     * @param {request} req
     * @param {response} res
     */
    static async edit(req , res){
        try {
            const { id } = req.params
            const { userId } = req.auth
            const user = await AutoEcoleModel.findById({_id : userId})
            if(!user) res.status(400).json({message : "vous n'avez pas cette autorisation !!!"})
            await AutoEcoleModel.updateOne({_id : userId}, req.body)
            .then(success =>{
                res.status(200).json({status : true ,message : "Vos informations oont étées modifiés avec succès !!!" , success})
            })
            .catch(err =>{
                res.status(400).json({status : false ,message : "Impossible de modifier les informations !!!"})
            })
        } catch (error) {
            res.status(500).json({message : "une erreur est survenue lors du traitement !!!"})
            console.log("une erreur est survenue..." , error)
        }
    }

    /**
     * @param {request} req
     * @param {response} res
     */
    static async delete(req , res){
        try {
            const { id } = req.params
            const { userId } = req.auth
            const user = await AutoEcoleModel.findById({_id : userId})
            const theUser = await AutoEcoleModel.findById({_id : id})
            if(!user) res.status(400).json({message : "vous n'avez pas cette autorisation !!!"})
            const update = {
                status : 0
            }
            if(!theUser)res.status(400).json({status : false ,message : "Aucun utilisateur ne correspond !"})
            await AutoEcoleModel.updateOne({_id : id},update)
            .then(success =>{
                res.status(200).json({status : true ,message : "Cet utilisateur à été supprimé !!!" , success})
            })
            .catch(err =>{
                res.status(400).json({status : false ,message : "Impossible de supprimer cet utilisateur !!!" , error : err.message})
            })
        } catch (error) {
            res.status(500).json({status : false , message : "une erreur est survenue lors du traitement !!!" , error : error.message})
            console.log("une erreur est survenue...", error)
        }
    }

    /**
     * 
     @param {request} req
     @param {response} res
     */
    static async getOne(req , res){
        try {
            const { id } = req.params
            const { userId } = req.auth
            const userConnected = await AutoEcoleModel.findById({_id : userId})
            if(!userConnected) res.status(400).json({status : false , message : "Vous n'avez pas cette autorisation !!!"})
            const user = await AutoEcoleModel.findById({_id : id})
            if(!user) res.status(400).json({status : false , message : "Aucun utilisateur ne correspond !!!"})
            return res.status(200).json({status :true , message : "L'utilisateur que vous recherchez" , user})
        } catch (error) {
            res.status(500).json({message : "uen erreur est survenue lors du traitmeent !!!" , error :error.message})
            console.log("une erreur est survenue..." , error)
        }
    }
}

export default AutoEcoleController;