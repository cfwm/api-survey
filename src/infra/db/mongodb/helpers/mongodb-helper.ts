import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
     // this.client = await MongoClient.connect(global.__MONGO_URI__, {
      // this.client = await MongoClient.connect(process.env.__MONGO_URI__, {
      this.client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}