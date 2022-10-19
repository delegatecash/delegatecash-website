import BookIcon from './svgs/book.svelte';
import SearchIcon from './svgs/search.svelte';
import TrashIcon from './svgs/trash.svelte';
import GithubIcon from './svgs/github.svelte';
import EtherscanIcon from './svgs/etherscan.svelte';
import EllipsisVerticalIcon from './svgs/ellipsis-vertical.svelte';
import XIcon from './svgs/x.svelte';

export const iconSvgNames = {
  book: BookIcon,
  search: SearchIcon,
  trash: TrashIcon,
  github: GithubIcon,
  etherscan: EtherscanIcon,
  'ellipsis-vertical': EllipsisVerticalIcon,
  x: XIcon
} as const;

export type IconName = keyof typeof iconSvgNames;

export default iconSvgNames;
