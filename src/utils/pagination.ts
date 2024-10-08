export default class Pagination {
  /**
   * Converte pagina para skip do prisma
   * @param page Number (digito da pagina atual)
   * @param amount Number (quantidade de itens por pagina)
   * @returns Number (quantidade de skip necessarios)
   */
  static PageToSkip(page?: number, amount?: number) {
    if (page) {
      return (page - 1) * (amount || 100);
    }
    return 0;
  }
}
