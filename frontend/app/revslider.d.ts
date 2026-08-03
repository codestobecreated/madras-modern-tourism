import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sr7-module': any;
      'sr7-bullet': any;
      'sr7-bullets': any;
      'sr7-content': any;
      'sr7-layer': any;
      [elemName: string]: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'sr7-module': any;
      'sr7-bullet': any;
      'sr7-bullets': any;
      'sr7-content': any;
      'sr7-layer': any;
      [elemName: string]: any;
    }
  }
}
