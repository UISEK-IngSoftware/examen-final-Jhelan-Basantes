import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonAvatar,
  IonSpinner,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';

interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  image: string | null;
}

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(
        'https://futuramaapi.com/api/characters?orderBy=id&orderByDirection=asc&page=1&size=50'
      );
      setCharacters(res.data.items);
    } catch (err) {
      setError('Error al cargar los personajes');
    } finally {
      setLoading(false);
    }
  };

  const refresh = (e: CustomEvent) => {
    fetchCharacters().then(() => e.detail.complete());
  };

  const goToProfile = (id: number) => {
    history.push(`/character/${id}`);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Futurama Characters</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent />
        </IonRefresher>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
            <IonSpinner name="crescent" />
          </div>
        ) : error ? (
          <p style={{ textAlign: 'center', marginTop: 50 }}>{error}</p>
        ) : characters.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: 50 }}>No hay personajes</p>
        ) : (
          <IonList>
            {characters.map((char) => (
              <IonItem key={char.id} button onClick={() => goToProfile(char.id)}>
                {char.image && <IonAvatar slot="start">
                  <img src={char.image} alt={char.name} />
                </IonAvatar>}
                <IonLabel>
                  <h2>{char.name}</h2>
                  <p>Género: {char.gender}</p>
                  <p>Estado: {char.status}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
