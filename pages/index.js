import styles from '../styles/Home.module.css'
import backImg from '../public/images/back.png'

export default function Home() {
  console.log(backImg)
  return (
    <div style={homeContainer}>
      <div style={homeText}>
        <div style={{flex: '1'}}></div>
        <div style={{flex: '2', paddingRight: '15%', paddingTop: '10%'}}>Gain Solution Task on GraphQL, MongoDB, Next.js and React.js</div>
      </div>
    </div>
  )
}

const homeContainer = {
  backgroundImage: `url(${backImg.src})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const homeText = {
    fontSize: '60px',
    textAlign: 'right',
    display: 'flex',
    height: '100%',
    
    justifyContent: 'space-between',
    color: '#9A9696',
    fontFamily: "Red Hat Text",
    fontWeight: '700',

}

