#!/bin/bash

# Script pour générer les certificats SSL pour le développement local

echo "🔐 Génération des certificats SSL pour localhost..."

# Créer le dossier certs s'il n'existe pas
mkdir -p certs

# Générer le certificat SSL auto-signé
openssl req -x509 -newkey rsa:4096 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes -subj "/C=FR/ST=France/L=Paris/O=UltraQuest/OU=Dev/CN=localhost"

echo "✅ Certificats SSL générés avec succès !"
echo "📁 Fichiers créés :"
echo "   - certs/key.pem (clé privée)"
echo "   - certs/cert.pem (certificat)"
echo ""
echo "🚀 Vous pouvez maintenant lancer le serveur HTTPS avec : npm run dev"
echo "🌐 L'application sera accessible sur : https://localhost:5173"
echo ""
echo "⚠️  Note : Votre navigateur affichera un avertissement de sécurité"
echo "   car le certificat est auto-signé. Cliquez sur 'Avancé' puis"
echo "   'Continuer vers localhost' pour accéder à l'application." 