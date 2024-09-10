/**
 * Cria metodos do prisma mockado com o 'data' informado.
 * @param entity String (nome da entidade, ex: 'user', 'login')
 * @param data Array (lista da entidade)
 * @returns Object (metodos do prisma mockado)
 */
export function prismaMock<T>(entity: string, data: T[]) {
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
