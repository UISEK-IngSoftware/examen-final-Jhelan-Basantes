import { useState, useEffect } from 'react';
import { Character } from '../data/characters';
import { useParams } from 'react-router';
import axios from 'axios';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonLoading,
  IonBackButton,
  IonButtons,
  IonCard
} from '@ionic/react';
import './CharacterProfile.css';

const CharacterProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://futuramaapi.com/api/characters', {
          params: {
            orderBy: 'id',
            orderByDirection: 'asc',
            page: 1,
            size: 50
          }
        });

        const found = response.data.items.find(
          (c: Character) => c.id === parseInt(id, 10)
        );

        if (found) setCharacter(found);
        else setError('Personaje no encontrado');
      } catch (err) {
        setError('Error al cargar el personaje');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="profile-content">
        {loading && <IonLoading isOpen={loading} message="Cargando..." />}
        {error && <p style={{ padding: '1rem', color: 'red' }}>{error}</p>}

        {character && (
          <IonCard className="character-card">
            <div className="character-flex">
              {/* Imagen a la izquierda */}
              <IonAvatar className="profile-avatar">
                <img
                  src={
                    character.image
                      ? character.image
                      : 'https://www.w3schools.com/howto/img_avatar.png'
                  }
                  alt={character.name || 'Perfil'}
                />
              </IonAvatar>

              {/* Información a la derecha */}
              <div className="character-info">
                <h1>{character.name}</h1>
                <p><strong>Género:</strong> {character.gender}</p>
                <p><strong>Estado:</strong> {character.status}</p>
                <p><strong>Especie:</strong> {character.species}</p>
                <p><strong>Creado en:</strong> {new Date(character.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CharacterProfile;