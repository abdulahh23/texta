from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """Parses system environment or `.env` file variables into structured Python attributes."""    
    #Ai:
    model: str
    api_key: str

    # Configures Pydantic to read automatically from local filesystem
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()