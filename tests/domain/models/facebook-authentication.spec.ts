import { FacebookAccount } from '@/domain/models'

// testa uma entidade do nosso domain

describe('FacebookAccount', () => {
  it('should create with facebook data only', () => {
    const sut = new FacebookAccount({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })

    expect(sut).toEqual({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
  })

  it('should update name if its empty', () => {
    const sut = new FacebookAccount(
      {
        name: 'any_fb_name',
        email: 'any_fb_email',
        facebookId: 'any_fb_id'
      },
      {
        id: 'any_id'
      }
    )

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
  })

  it('should not update name if its not empty', () => {
    const sut = new FacebookAccount(
      {
        name: 'any_fb_name',
        email: 'any_fb_email',
        facebookId: 'any_fb_id'
      },
      {
        id: 'any_id',
        name: 'any_name'
      }
    )

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
  })
})
