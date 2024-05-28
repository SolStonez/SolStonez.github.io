import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Maintenance Reports</h1>
      <ul>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((facility) => (
          <li key={facility}>
            <Link href={`/facility/${facility}`}>{facility}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
