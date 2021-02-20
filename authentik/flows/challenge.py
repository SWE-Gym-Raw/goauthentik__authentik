from authentik.flows.transfer.common import DataclassEncoder
from dataclasses import asdict, is_dataclass
from enum import Enum
from json.encoder import JSONEncoder

from django.http import JsonResponse
from rest_framework.fields import ChoiceField, DictField, JSONField
from rest_framework.serializers import CharField, Serializer


class ChallengeTypes(Enum):

    native = "native"
    shell = "shell"
    redirect = "redirect"


class Challenge(Serializer):

    type = ChoiceField(choices=list(ChallengeTypes))
    component = CharField(required=False)
    args = JSONField()


class ChallengeResponse(Serializer):

    pass


class HttpChallengeResponse(JsonResponse):
    def __init__(self, challenge: Challenge, **kwargs) -> None:
        super().__init__(challenge.data, encoder=DataclassEncoder, **kwargs)
