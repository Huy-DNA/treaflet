export type ImageSize = 'tiny' | 'very-small' | 'small' | 'normal' | 'large' | 'very-large' | 'huge';
export function imageSize (name: ImageSize): string {
  switch (name) {
    case 'tiny':
      return '8px';
    case 'very-small':
      return '16px';
    case 'small':
      return '24px';
    case 'normal':
      return '36px';
    case 'large':
      return '56px';
    case 'very-large':
      return '72px';
    case 'huge':
      return '100px'; 
  }
}

export type FontSize = 'tiny' | 'very-small' | 'small' | 'normal' | 'large' | 'very-large' | 'huge';
export function fontSize (name: ImageSize): string {
  switch (name) {
    case 'tiny':
      return '8px';
    case 'very-small':
      return '16px';
    case 'small':
      return '24px';
    case 'normal':
      return '36px';
    case 'large':
      return '56px';
    case 'very-large':
      return '72px';
    case 'huge':
      return '100px'; 
  }
}
