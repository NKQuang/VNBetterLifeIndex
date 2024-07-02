@extends("dashboard.layout")
@section("content")

<div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
    <div class="relative flex flex-col w-full min-w-0  break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl flex justify-between items-center">
            <h6 class="text-lg font-semibold text-white">Bảng trọng số</h6>
            {{-- <a href="{{ route('weights.create') }}" class="font-semibold leading-tight text-xs text-white bg-green-500 px-3 py-2 rounded">Tạo mới</a> --}}
            <a href="{{ route('weights.edit') }}" class="font-semibold leading-tight text-xs text-white bg-blue-500 px-3 py-2 rounded">Cập giá trị các trọng số</a>

            <!-- Import Excel Form -->
        </div>


        <div class="flex-auto px-0 pt-0 pb-2">
            <div class="p-0 overflow-x-auto">
                <div class="overflow-x-auto">
                    <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                        <thead class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <tr>
                                <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-gray-200 border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">#ID</th>
                                <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-gray-200 border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Tên</th>
                                <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-gray-200 border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Giá trị</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white text-gray-600 text-sm font-light">
                            @foreach ($weight as $row)
                            <tr class="border-b border-gray-200 hover:bg-gray-100">
                                <td class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    <div class="flex px-2 py-1">
                                        <div class="flex flex-col justify-center">
                                            <h6 class="mb-0 leading-normal text-sm">{{ $row->id }}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    <p class="mb-0 font-semibold leading-tight text-xs"><i class="fa-solid fa-bullseye"></i> {{ $row->name }}</p>
                                </td>
                                <td class="p-2 text-center align-middle bg-transparent border-b border-gray-200 shadow-transparent whitespace-nowrap">
                                    <span class="font-semibold leading-tight text-xs text-slate-400">{{ $row->value }}</span>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</div>
@endsection
