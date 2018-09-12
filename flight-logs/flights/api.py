from rest_framework import serializers, viewsets
from .models import FlightsInfo, AircraftInfo

class FlightsInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FlightsInfo
        fields = ('name', 'content')
    def create(self, validated_data):
        user = self.context['request'].user
        flight_info = FlightsInfo.objects.create(user=user, **validated_data)
        return flight_info

class FlightsInfoViewSet(viewsets.ModelViewSet):
    serializer_class = FlightsInfoSerializer
    queryset = FlightsInfo.objects.none()
    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return FlightsInfo.objects.none()
        else:
            return FlightsInfo.objects.filter(user=user)

class AircraftInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AircraftInfo
        fields = ('name', 'content')
    def create(self, validated_data):
        user = self.context['request'].user
        aircraft_info = AircraftInfo.objects.create(user=user, **validated_data)
        return aircraft_info

class AircraftInfoViewSet(viewsets.ModelViewSet):
    serializer_class = AircraftInfoSerializer
    queryset = AircraftInfo.objects.none()
    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return AircraftInfo.objects.none()
        else:
            return AircraftInfo.objects.filter(user=user)