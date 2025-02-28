export default function calculateDueBills(bills) {
    const latestTransactionDate = new Date("2024-08-19T00:00:00Z");
    const dueSoonThreshold = 5;
  
    const dueSoonPayments = bills.filter((t) => {
      const transactionDate = new Date(t.date).getUTCDate();
  
      return (
        t.recurring &&
        transactionDate >= latestTransactionDate.getUTCDate() &&
        transactionDate <= latestTransactionDate.getUTCDate() + dueSoonThreshold
      );
    });
    const paidBills = bills.filter((t) => {
      const transactionMonth = new Date(t.date).getUTCMonth();
      return (
        t.recurring && transactionMonth === latestTransactionDate.getUTCMonth()
      );
    });
    const upcomingBills = bills.filter((t) => {
      const transactionDate = new Date(t.date).getUTCDate();
  
      return (
        t.recurring &&
        transactionDate >= latestTransactionDate.getUTCDate() + dueSoonThreshold
      );
    });
  
    const dueSoonAmount = Number(dueSoonPayments.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0)).toFixed(2);
    const upcomingAmount = Number(upcomingBills.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0)).toFixed(2);
    const paidAmount = Number(paidBills.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0)).toFixed(2);
    return {
      dueSoonAmount,
      upcomingAmount,
      paidAmount,
      paidLength: paidBills.length,
      upcomingLength: upcomingBills.length,
      dueLength: dueSoonPayments.length,
    };
  }