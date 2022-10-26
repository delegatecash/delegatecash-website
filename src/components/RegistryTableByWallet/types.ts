export type RegistryRow = {
  delegate: string;
  type: 'NONE' | 'ALL' | 'CONTRACT' | 'TOKEN';
  contract?: string;
  tokenId?: number;
};
