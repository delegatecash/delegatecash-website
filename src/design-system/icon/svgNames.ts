import BookIcon from './svgs/book.svelte';
import SearchIcon from './svgs/search.svelte';
import TrashIcon from './svgs/trash.svelte';
import GithubIcon from './svgs/github.svelte';
import EtherscanIcon from './svgs/etherscan.svelte';
import EllipsisVerticalIcon from './svgs/ellipsis-vertical.svelte';
import XIcon from './svgs/x.svelte';
import CheckShieldIcon from './svgs/check-shield.svelte';
import TwitterIcon from './svgs/twitter.svelte';
import DuneIcon from './svgs/dune.svelte';
import SolidityIcon from './svgs/solidity.svelte';

export const iconSvgNames = {
  book: BookIcon,
  search: SearchIcon,
  trash: TrashIcon,
  github: GithubIcon,
  etherscan: EtherscanIcon,
  'ellipsis-vertical': EllipsisVerticalIcon,
  x: XIcon,
  'check-shield': CheckShieldIcon,
  twitter: TwitterIcon,
  dune: DuneIcon,
  solidity: SolidityIcon
} as const;

export type IconName = keyof typeof iconSvgNames;

export default iconSvgNames;
