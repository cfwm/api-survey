import { Encrypter } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
interface SutTypes {
  sut: DbAddAccount
  encryterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub
}

const makeSut = (): SutTypes => {

  const encryterStub = makeEncrypter()
  const sut = new DbAddAccount(encryterStub)
  return {
    sut,
    encryterStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encryterStub} = makeSut()
    const encryptSpy = jest.spyOn(encryterStub, 'encrypt')
    const accountData= {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throwws', async () => {
    const { sut, encryterStub} = makeSut()
    jest.spyOn(encryterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData= {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})