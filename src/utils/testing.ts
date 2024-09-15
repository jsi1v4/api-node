export default class Testing {
  /**
   * Cria metodos do prisma mockado com o 'data' informado.
   * @param entity String (nome da entidade, ex: 'user', 'login')
   * @param data Array (lista da entidade)
   * @returns Object (metodos do prisma mockado)
   */
  static PrismaMock<T>(entity: string, data: T[]) {
    return {
      [entity]: {
        create: jest.fn().mockReturnValue(data[0]),
        findMany: jest.fn().mockResolvedValue(data),
        findUnique: jest.fn().mockResolvedValue(data[0]),
        update: jest.fn().mockResolvedValue(data[0]),
        delete: jest.fn()
      }
    };
  }

  static PrismaMocks(entitys: { [key: string]: any[] }) {
    const result = {};

    for (const key of Object.keys(entitys)) {
      result[key] = {
        create: jest.fn().mockReturnValue(entitys[key][0]),
        findMany: jest.fn().mockResolvedValue(entitys[key]),
        findUnique: jest.fn().mockResolvedValue(entitys[key][0]),
        update: jest.fn().mockResolvedValue(entitys[key][0]),
        delete: jest.fn()
      };
    }

    return result;
  }
}
