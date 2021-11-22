const signUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <div className="form-group">
        <label>Email address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type='password' className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
};

export default signUp;