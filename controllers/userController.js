import UtilisateurModel from '../models/utilisateur.js';
import bcrypt from "bcrypt";
import { generateToken } from '../middleware/token.js'

class UtilisateurController {

    
    /**
     * 
     * @param {request} req 
     * @param { response} res 
     * 
     */
    
    static async create(req , res){
        try {
        const utilisateurExist = await UtilisateurModel.findOne({email : req.body.email})
        const numExist = await UtilisateurModel.findOne({contact : req.body.phone})
        if(utilisateurExist) return res.status(400).json({message : 'cet utilisateur existe deja ou email deja utilisé !!'})
        if (numExist) return res.status(400).json({message :"Ce contact est déja utilisé"})
        req.body.password = await bcrypt.hash(req.body.password , 10)
        console.log(req.body.password)
        await UtilisateurModel.create(req.body)
        .then(user => {
            res.status(200).json({status : true , message : 'utilisateur ajouté !' , user})
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
            const utilisateur = await UtilisateurModel.findOne({email})
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
            const allUtilisateur = await UtilisateurModel.find()
            if(!allUtilisateur) res.status(400).json({status : false , message : "Aucune liste disponible..."})
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
            console.log(userId)
            const user = await UtilisateurModel.findById({_id : userId})
            if(!user) res.status(400).json({message : "vous n'avez pas cette autorisation !!!"})
            await UtilisateurModel.updateOne({_id : userId}, req.body)
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
            const user = await UtilisateurModel.findById({_id : userId})
            const theUser = await UtilisateurModel.findById({_id : id})
            if(!user) res.status(400).json({message : "vous n'avez pas cette autorisation !!!"})
            if(!theUser)res.status(400).json({status : false ,message : "Aucun utilisateur ne correspond !"})
            await UtilisateurModel.deleteOne({_id : id})
            .then(res => res.status(203))
            .catch(err => res.status(400).json({message : "Echec de la suppression"}))
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
            const {id} = req.params
            const user = await UtilisateurModel.findById({_id : id});
            if(!user) res.status(400).json({status : false , message : "Aucun utilisateur ne correspond !!!"})
            return res.status(200).json({status :true , message : "L'utilisateur que vous recherchez" , user})
        } catch (error) {
            res.status(500).json({message : "uen erreur est survenue lors du traitmeent !!!" , error :error.message})
            console.log("une erreur est survenue..." , error)
        }
    }
}

export default UtilisateurController;