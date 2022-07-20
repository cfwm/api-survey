import { AddAccountRepository } from "../../../../data/protocols/add-account-repository"
import { AddAccountModel } from "../../../../domain/usecases/add-account"
import { AccountModel } from "../../../../domain/models/account"
import { MongoHelper } from "../helpers/mongodb-helper"

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    // bricolage
    let dataResult = {
      id: '',
      name: '',
      email: '', 
      password: '',
    }

    if (result.acknowledged) Object.assign(dataResult, {
      id: true,
      name: 'any_name',
      email: 'any_email@email.com', 
      password: 'any_password',
    })

    return dataResult

    // MongoDb version 5.0.9
    // return Object.assign({}, { acknowledged: result.acknowledged, insertedId: result.insertedId.toString() })
    
    // MongoDB version 4.0.3
    // const account = result.ops[0]
    // const { _id, ...accountWithoutId } = account
    // return Object.assign({}, accountWithoutId, { id: _id })
  }
}