import BarChart from './components/BarChart';

const Home = () => {
  return (
    <div>
      <BarChart
        title={'Number of uses of the three major frontend frameworks'}
        xName={['Vue', 'React', 'Angular']}
        sValue={[2000, 5000, 100]}
      />
      <BarChart
        title={'Utilization rate of the three major frontend frameworks'}
        xName={['Vue', 'React', 'Angular']}
        sValue={[20, 50, 30]}
        style={{ width: '500px', height: '400px' }}
      />
    </div>
  );
};

export default Home;
