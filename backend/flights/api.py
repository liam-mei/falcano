from rest_framework import serializers, viewsets
from .models import Flights, Aircraft


class FlightsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Flights
        fields = ('name', 'content')

    def create(self, validated_data):
        user = self.context['request'].user
        flight = Flights.objects.create(user=user, **validated_data)
        return flight


class FlightsViewSet(viewsets.ModelViewSet):
    serializer_class = FlightsSerializer
    queryset = Flights.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Flights.objects.none()
        else:
            return Flights.objects.filter(user=user)


class AircraftSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Aircraft
        fields = ('name', 'content')

    def create(self, validated_data):
        user = self.context['request'].user
        aircraft = Aircraft.objects.create(user=user, **validated_data)
        return aircraft


class AircraftViewSet(viewsets.ModelViewSet):
    serializer_class = AircraftSerializer
    queryset = Aircraft.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Aircraft.objects.none()
        else:
            return Aircraft.objects.filter(user=user)
