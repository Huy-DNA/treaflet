export type ImageSize = 'tiny' | 'very-small' | 'small' | 'normal' | 'large' | 'very-large' | 'huge';
export function imageSize (name: ImageSize): string {
  switch (name) {
    case 'tiny':
      return '16px';
    case 'very-small':
      return '24px';
    case 'small':
      return '36px';
    case 'normal':
      return '56px';
    case 'large':
      return '72px';
    case 'very-large':
      return '81px';
    case 'huge':
      return '100px'; 
  }
}
