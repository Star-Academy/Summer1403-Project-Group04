export function getRoleColor(role: string): string {
  switch (role) {
    case 'Admin':
      return 'green';
    case 'DataAdmin':
      return 'orange';
    case 'DataAnalyst':
      return 'blue';
    default:
      return 'default';
  }
}
