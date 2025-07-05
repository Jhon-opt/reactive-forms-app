export interface Country {

  name: Name;
  cca3: string;
  borders: string[];
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  fra: Fra;
  hat: Fra;
}

export interface Fra {
  official: string;
  common:   string;
}
