export type ImageSize = 'tiny' | 'very-small' | 'small' | 'normal' | 'slightly-large' | 'large' | 'very-large' | 'huge';
export function imageSize (name: ImageSize): string {
  switch (name) {
    case 'tiny':
      return '8px';
    case 'very-small':
      return '10px';
    case 'small':
      return '16px';
    case 'normal':
      return '20px';
    case 'slightly-large':
      return '24px';
    case 'large':
      return '36px';
    case 'very-large':
      return '45px';
    case 'huge':
      return '100px'; 
  }
}

export type FontSize = 'tiny' | 'very-small' | 'small' | 'normal' | 'slightly-large' | 'large' | 'very-large' | 'huge';
export function fontSize (name: FontSize): string {
  switch (name) {
    case 'tiny':
      return '8px';
    case 'very-small':
      return '10px';
    case 'small':
      return '16px';
    case 'normal':
      return '18px';
    case 'slightly-large':
      return '20px';
    case 'large':
      return '24px';
    case 'very-large':
      return '36px';
    case 'huge':
      return '45px'; 
  }
}
