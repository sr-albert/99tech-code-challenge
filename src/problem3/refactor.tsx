/**
 * Improvements applied in this refactor:
 * - Type correctness: define `blockchain` on WalletBalance; strongly type getPriority;
 *   provide minimal declarations or proper imports for hooks/components.
 * - Logic correctness: filter positive balances with valid priority; always return a number
 *   in sort (use descending b - a pattern).
 * - Memoization accuracy: keep `sortedBalances` dependent on `balances` only; derive and memoize
 *   `formattedBalances` from `sortedBalances`.
 * - Rendering stability: use deterministic keys like `${blockchain}:${currency}`; remove undefined
 *   identifiers (e.g., `classes`).
 * - Value formatting: use `toFixed(2)` for user-facing amounts.
 * - Null-safety: default missing `prices[currency]` to 0.
 * - Props handling: render `children` if accepted.
 */
 
// Local interfaces with accurate fields used in the component logic
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formattedAmount: string;
}

// Minimal ambient type declarations for external hooks/components used by this page.
// Replace these with real imports in your app.
declare function useWalletBalances(): WalletBalance[];
declare function usePrices(): Record<string, number>;

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
  className?: string;
}
declare const WalletRow: React.FC<WalletRowProps>;

type Props = React.HTMLAttributes<HTMLDivElement>;

const getPriority = (blockchain: string): number => {
  const priorityByChain: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };
  return priorityByChain[blockchain] ?? -99;
};

export const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
      });
  }, [balances]);

  const formattedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return sortedBalances.map((balance) => ({
      ...balance,
      formattedAmount: balance.amount.toFixed(2),
    }));
  }, [sortedBalances]);

  const rows = useMemo(() => {
    return formattedBalances.map((balance) => {
      const price = prices[balance.currency] ?? 0;
      const usdValue = price * balance.amount;
      return (
        <WalletRow
          key={`${balance.blockchain}:${balance.currency}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formattedAmount}
        />
      );
    });
  }, [formattedBalances, prices]);

  return (
    <div {...rest}>
      {children}
      {rows}
    </div>
  );
};

export default WalletPage;
