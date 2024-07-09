import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden"/>
            <span className="orange_gradient">Coding Tips & Tricks</span>
        </h1>
        <p className='desc text-center'>
              <span><b>Welcome to Code Arena:</b></span> Your go-to platform for sharing and discovering the best coding tips and tricks from developers around the world.
        </p>

        <Feed />
    </section>
  )
}

export default Home