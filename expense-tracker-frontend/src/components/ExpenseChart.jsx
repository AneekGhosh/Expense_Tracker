import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ExpenseChart = ({ transactions }) => {
  const income = transactions.filter(t => t.transaction_type === "income").reduce((acc, curr) => acc + Number(curr.amount), 0);
  const expense = transactions.filter(t => t.transaction_type === "expense").reduce((acc, curr) => acc + Number(curr.amount), 0);

  const data = [
    { name: "Income", value: income },
    { name: "Expenses", value: expense }
  ];

  const COLORS = ["#198754", "#dc3545"]; 

  if (income === 0 && expense === 0) {
    return <p className="text-center text-muted mt-5">Add some transactions to see your chart!</p>;
  }

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;