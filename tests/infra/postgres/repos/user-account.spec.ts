import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { newDb } from 'pg-mem'
import { Entity, PrimaryGeneratedColumn, Column, getRepository } from 'typeorm'

// use typeOrm 0.2.29

class PgUserAccountRepository implements LoadUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email: params.email })

    if (pgUser !== undefined) {
      return {
        id: pgUser?.id.toString(),
        name: pgUser?.name ?? undefined
      }
    }
  }
}

@Entity({ name: 'usuarios' })
export class PgUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'nome', nullable: true })
  name?: string

  @Column()
  email!: string

  @Column({ name: 'id_facebook', nullable: true })
  facebookId?: number
}

describe('PgUserAccountRepository', () => {
  describe('load', () => {
    it('should returns an account if email exists', async () => {
      const db = newDb()

      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PgUser]
      })

      await connection.synchronize()

      const pgUserRepo = getRepository(PgUser)
      await pgUserRepo.save({ email: 'existing_email' })
      // const pgUserRepo = new PgUser();

      const sut = new PgUserAccountRepository()

      await sut.load({ email: 'existing_email' })

      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: '1' })
    })
  })
})
