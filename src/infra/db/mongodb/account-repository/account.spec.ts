import { MongoHelper } from '../helpers/mongodb-helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    // await MongoHelper.connect(global.__MONGO_URI__);
    // await MongoHelper.connect(process.env.__MONGO_URI__);
    await MongoHelper.connect('mongodb://localhost:27017');
  })
  
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com', 
      password: 'any_password',
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(account.name)
    expect(account.email).toBe(account.email)
    expect(account.password).toBe(account.password)
  })
})