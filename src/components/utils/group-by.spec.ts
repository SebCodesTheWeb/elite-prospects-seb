import { groupBy } from './group-by'

describe('groupBy', () => {
  it('groups objects by a specified key', () => {
    const input = [
      { name: 'Alice', age: 20 },
      { name: 'Bob', age: 20 },
      { name: 'Charlie', age: 30 },
    ]

    const grouped = groupBy(input, 'age')

    expect(grouped).toEqual({
      '20': [
        { name: 'Alice', age: 20 },
        { name: 'Bob', age: 20 },
      ],
      '30': [{ name: 'Charlie', age: 30 }],
    })
  })
})
